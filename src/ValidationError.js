/**
 * SimpleValid validation results in this class.
 * For example, when the validation fails `name` property, this class will get the error message for `name`.
 *
 * @see SimpleValid.execute
 */
export default class ValidationError {
  /**
   *
   * @param errors
   */
  constructor (errors) {
    try {
      if (errors) this.valid(errors);
      this.errors = errors ? errors : {};
    } catch (e) {
      console.error(e);
      this.errors = {};
    }
  }

  /**
   * check error object
   * error object style must be following style.
   * {
   *  // error properties must be an array
   *  error1: [],
   *  error2: []
   * }
   * @param errors
   * @throws
   */
  valid (errors) {
    if (typeof errors !== 'object') throw 'Given variable is not Object.';
    if (errors.length !== undefined) throw 'Given variable is not Object.';
    // is object
    for (var key in errors) {
      if (
        typeof errors[key] != 'object' ||
        (typeof errors[key] == 'object' && errors[key].length === undefined)
      ) {
        throw "Given Object [" + key + "] value is not an Array.\nValues must be an Array object."
      }
    }
  }

  /**
   * add error
   * @param id
   * @param description
   * @returns {*}
   */
  add (id, description) {
    try {
      if (!id) throw 'id is not given';
      if (this.has(id)) {
        this.errors[id].push(description);
      } else {
        this.errors[id] = [ description ];
      }
    } catch (e) {
      debugger;
      throw e;
    }
  }

  /**
   * check id error is exist.
   * check having errors when param id not given.
   * @param id
   * @returns {boolean}
   */
  has (id) {
    if (id) {
      return this.errors[id] === undefined ? false : true;
    } else {
      let had = false;
      for (var key in this.errors) {
        if (key) had = true;
      }
      return had;
    }
  }

  /**
   * delete error
   * @param id
   * @returns {boolean}
   */
  remove (id) {
    if (!id) return false;
    if (!this.has(id)) return false;
    delete this.errors[id];
    return true;
  }

  /**
   * get error
   * @param id
   * @returns {*}
   */
  get (id) {
    if (!id) return false;
    if (!this.has(id)) return false;
    return this.errors[id];
  }

  /**
   * render logs in console
   */
  log () {
    console.error('has following Errors:', this.errors);
  }

  /**
   * get all errors
   * @returns {{}|*}
   */
  all () {
    return this.errors;
  }
}
