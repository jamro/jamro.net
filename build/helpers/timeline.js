module.exports = function(prop) {
  let result = [];

  result['icon'] = 'star';
  result['badgeStyle'] = {};
  result['className'] = '';
  switch(this.type) {
    case 'job':
      result['icon'] = 'briefcase';
      result['badgeStyle'] = "background-color: #be3a06";
      result['className'] = '';
      break;
    case 'education':
      result['icon'] = 'graduation-cap';
      result['badgeStyle'] = "background-color: #0864cd";
      result['className'] = 'timeline-inverted';
      break;
    case 'business':
      result['icon'] = 'lightbulb';
      result['badgeStyle'] = "background-color: #b7c001";
      result['className'] = 'timeline-inverted';
      break;
  }
  result['dates'] = (this.from == this.to) ? this.from : `${this.from} - ${this.to}`;

  return result[prop];
};
