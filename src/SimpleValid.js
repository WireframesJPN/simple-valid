import ValidationError from './ValidationError';

/**
 * A list of rules which the property must pass
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
 * @property {RuleParams} params
 */

/**
 * A list of parameters which is given to the Rule.
 * The length and the type of each elements depend on the rules.
 *
 * @typedef {Array<*>} RuleParams
 */

/**
 * A function which validates `value`.
 * when `value` passed the function, the function returns true.
 *
 * @callback Rule
 * @param {*} value a variable to be tested
 * @param {RuleParams} params
 * @returns {boolean}
 */

/**
 * A function which decorates the Rule.
 * Because this function accepts all properties as `values`, for example you can compare the property with another one.
 *
 * @callback PrepareRule
 * @param {Object<string, *>} values a whole object to be tested
 * @param {string} key a name of the property to be tested
 * @param {Rule} rule
 * @returns {Rule}
 */

/**
 * an error message factory.
 *
 * @callback RuleMessageFactory
 * @param {*} value a variable to be tested
 * @param {RuleParams} params
 * @returns {string}
 */

/**
 * an error message for the Rule.
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
    if (typeof rule !== 'function' && rule.length) {
      if (typeof rule[0] === 'function') this.rules[name] = rule[0];
      if (typeof rule[1] === 'function') this.prepares[name] = rule[1];
    } else {
      if (typeof rule === 'function') this.rules[name] = rule;
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
    for (let key in rules) {
      if (messages[key] === undefined) {
        messages[key] = `${key} was undefined`;
      }

      this.addRule(key, rules[key], messages[key]);
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

    for (var key in target) {
      var rules = target[key];
      var ruleStrings;

      if (typeof rules != 'string' && rules.length !== undefined) {
        ruleStrings = rules;
      } else {
        ruleStrings = rules.split('|');
      }

      result[key] = [];

      for (var i = 0; i < ruleStrings.length; i++) {
        result[key].push(this.createRuleObject(ruleStrings[i], key));
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
   * @returns {ValidationError}
   */
  execute (values, rules, messages={}) {
    this.setValues(values);
    this.setRules(rules);

    const errors = new ValidationError();

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
   * @param {string} ruleString
   * @param {string} key
   * @returns {FormattedRuleConfig}
   */
  createRuleObject (ruleString, key) {
    let rule = ruleString.split(':');
    let name = rule[0];

    /**
     * you can modify rule item if you set up the preparing object.
     */
    if (this.prepares[name] !== undefined) {
      rule = this.prepares[name](this.values, key, rule)
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
      let result = this.checkRule(value, rules[i]);
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
    let _message;
    if (message && message[target] !== undefined && message[target][name] !== undefined) {
      _message = message[target][name];
    } else {
      _message = this.messages[name]
    }
    return _message;
  }
}
