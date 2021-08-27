import Errors from 'simple-error-object';

/**
 * A rule config that the property must pass
 * It can be an array of rule formats, or must be a string joined with `|`.
 *
 * ```
 * // 'required|email' or ['required', 'email']
 * ```
 *
 * @typedef {string[]|string} RuleConfig
 */

/**
 * A formatted config for Rule.
 * A given rule format becomes this like the following.
 * SimpleValid finds a Rule from its own `rules` by `name` of a config.
 *
 * ```
 * 'required' => { name: 'required', params: null }
 * 'email' => { name: 'email', params: null }
 * 'between:1,10' => { name: 'between', params: ['1', '10'] }
 * ```
 *
 * @typedef {Object} FormattedRuleConfig
 * @property {string} name
 * @property {(string[]|null)} params
 */

/**
 * A function that validates `value`.
 * when `value` passed the function, the function returns true.
 *
 * @callback Rule
 * @param {*} value
 * @param {FormattedRuleConfig.params} params
 * @returns {boolean}
 */

/**
 * A function that decorates the Rule.
 * Because this function accepts all properties as `values`, for example you can compare the property with another one.
 *
 * @callback PrepareRule
 * @param {Object<string, *>} values
 * @param {string} key
 * @param {Rule} rule
 * @returns {Rule}
 */

/**
 * @callback RuleMessageFactory
 * @param {*} value
 * @param {string[]|null} params
 * @returns {string}
 */

/**
 * An error message that the property cannot pass the rules.
 *
 * @typedef {string|RuleMessageFactory} RuleMessage
 */

/**
 * Check and Return Error Object.
 * Error Object is Using simple-error-object.
 * https://github.com/WireframesJPN/simple-error-object
 *
 * ```
 * {
 *  user_id: 'required|email', // add validator with pipe,
 *  password: [ 'required', 'not_in:test,aaaa', 'regex:^[0-9a-zA-Z]+$' ] // or array.
 * }
 * ```
 */
export default class SimpleValid {
  /**
   * class constructor
   *
   * @param {Object<string, Rule|[Rule, PrepareRule]>} rules
   * @param {Object<string, RuleMessage>} messages
   */
  constructor (rules, messages) {
    /**
     * @type {Object<string, Rule>}
     */
    this.rules = {};
    /**
     * @type {Object<string, RuleMessage>}
     */
    this.messages = {};
    /**
     * @type {Object<string, PrepareRule>}
     */
    this.prepares = {};

    this.addRules(rules, messages);
  }

  /**
   * Add rule.
   *
   * @param {string} name
   * @param {Rule|[Rule, PrepareRule]} rule
   * @param {RuleMessage} message
   */
  addRule (name, rule, message) {
    if (typeof rule === 'function') {
      this.rules[name] = rule;
    } else if (rule.length) {
      // rule must be [Rule, PrepareRule]
      const [rule_function, prepare] = rule;

      if (typeof rule_function === 'function') this.rules[name] = rule_function;
      if (typeof prepare === 'function') this.prepares[name] = prepare;
    }

    if (message) {
      this.messages[name] = message;
    }
  }

  /**
   * Add Rules.
   *
   * @param {Object<string, Rule|[Rule, PrepareRule]>} rules
   * @param {Object<string, RuleMessage>} messages
   */
  addRules (rules, messages) {
    for (let rule_name in rules) {
      if (messages[rule_name] === undefined) {
        messages[rule_name] = `${rule_name} was undefined`;
      }

      this.addRule(rule_name, rules[rule_name], messages[rule_name]);
    }
  }

  /**
   * Set values.
   *
   * @param values
   */
  setValues (values) {
    this.values = values;
  }

  /**
   * Set RuleConfig as FormattedRuleConfig.
   *
   * @param {Object<string, RuleConfig>} target
   */
  setRules (target) {
    let result = {};

    for (let key in target) {
      const rules = target[key];
      const ruleStrings = typeof rules != 'string' && rules.length !== undefined ? rules : rules.split('|');

      result[key] = [];

      for (let i = 0; i < ruleStrings.length; i++) {
        result[key].push(this.createFormattedRuleConfig(ruleStrings[i], key));
      }
    }

    this.check_rules = result;
  }

  /**
   * Execute validation.
   *
   * @param {Object<string, *>} values
   * @param {Object<string, RuleConfig>} rules
   * @param {Object<string, RuleMessage>} [messages={}]
   * @returns {Errors}
   */
  execute (values, rules, messages={}) {
    this.setValues(values);
    this.setRules(rules);

    const errors = new Errors();

    try {
      for (let target in this.check_rules) {
        let target_val = this.values[target] === undefined ? false : this.values[target];
        if (target_val === false) throw 'Missing Validation Target.';
        let error = this.check(this.check_rules[target], target_val);
        if (error) {
          let message = this.getMessage(error.name, target, messages);
          errors.add(target, (typeof message === 'function' ? message(error.value, error.rule.params) : message))
        }
      }
      return errors;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Create FormattedRuleConfig from rule format.
   *
   * @param {string} ruleFormat
   * @param {string} target_property_name
   * @returns {FormattedRuleConfig}
   */
  createFormattedRuleConfig (ruleFormat, target_property_name) {
    let rule = ruleFormat.split(':');
    const name = rule[0];

    /**
     * you can modify rule item if you set up the preparing object.
     */
    if (this.prepares[name] !== undefined) {
      rule = this.prepares[name](this.values, target_property_name, rule)
    }

    let params;
    if (rule[1] !== undefined) {
      params = rule[1].split(',');
    }

    return {
      name,
      params: params ? params : null
    }
  }

  /**
   *
   * @param {FormattedRuleConfig[]} rules
   * @param {*} value
   * @returns {boolean|string}
   */
  check (rules, value) {
    for (let i = 0; i < rules.length; i++) {
      const result = this.checkRule(value, rules[i]);

      if (result) {
        return result;
      }
    }

    return false;
  }

  /**
   * Check validation rules and add error if exist.
   *
   * @param {*} value
   * @param {FormattedRuleConfig} rule
   * @returns {string|{name: string, value: *, rule: Rule}|boolean}
   */
  checkRule (value, rule) {
    const { name, params } = rule;

    if (this.rules[name] === undefined) return 'norule';

    return this.rules[name](value, params) ? { name, value, rule } : false;
  }

  /**
   * get error message for the property.
   * If no message is given, the default message will return.
   *
   * @param {string} name
   * @param {string} target
   * @param {Object} [message]
   * @returns {RuleMessage}
   */
  getMessage (name, target, message) {
    if (message && message[target] !== undefined && message[target][name] !== undefined) {
      return message[target][name];
    }

    return this.messages[name];
  }
}
