import './Match.sol';

contract Broker {
    enum GameType {NaughtCross};
    function setup(uint8 typeId) returns (Match) {
        var type = GameType(typeId);
        if (type == GameType.NaughtCross) {
            return new NaughtCrossGame(x, y);
        }
        throw;
    }
}
