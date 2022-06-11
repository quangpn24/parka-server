const compareTime = (t1, t2) => {
  return Date.parse(`2/4/2000 ${t1}`) >= Date.parse(`2/4/2000 ${t2}`);
};

//s1,e1,s2,e2 is string
const isTimeFrameOverlap = (s1, e1, s2, e2) => {
  if (compareTime(s2, s1) && compareTime(e1, s2)) {
    return true;
  }
  if (compareTime(s1, s2) && compareTime(e2, s1)) {
    return true;
  }
  return false;
};

module.exports = { isTimeFrameOverlap };
