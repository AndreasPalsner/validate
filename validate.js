String.prototype.validate = function (rule) {
  if (rule instanceof RegExp) {
    return this.match(rule) !== null;
  }

  const evaluate = (lhs, rhs, operand) => {
    switch (operand) {
      case '=':
        return lhs === rhs
      case '!=':
        return lhs !== rhs
      case '>':
        return lhs > rhs
      case '>=':
        return lhs >= rhs
      case '<':
        return lhs < rhs
      case '<=':
        return lhs <= rhs
    }

    throw new Error('Invalid operand: ' + operand)
  }

  let negation = false

  if (rule[0] === '!') {
    negation = true;
    rule = rule.slice(1, rule.length)
  }

  const expression = rule.split(/(>|>=|=|<|<=|!=)/)

  let result

  switch (expression[0]) {
    case 'empty':
      result = evaluate(this.length, 0, '=');
      break;
    case 'length':
      result = evaluate(this.length, parseInt(expression[2]), expression[1])
      break;
    default:
      throw new Error('Unknown validator: ' + expression[0])
  }

  if (negation) {
    return !result
  }

  return result
};
