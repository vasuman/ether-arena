const node = {
  getChallenges() {
    return new Promise((res, rej) => {
      res([{ from: '0xbabe', at: '0xcafe' }]);
    });
  }
};

export default node;
