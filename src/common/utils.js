const _ = exports;

_.Error = class extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
  log(verbose = true) {
    if (this.data)
      console.error(this.data);
    if (verbose)
      console.error(this.stack);
    else
      console.error(this.message);
  }
};

_.try = (fn, onError = console.error) => {
  try {
    const result = fn();
    if (result?.catch) return result.catch(onError);
    else return result;
  } catch (error) {
    return onError(error);
  }
}
