import './Match.sol';

contract Broker {

    uint8 constant public version = 0;

    enum GameType {NaughtCross}

    Watcher watcher;

    function setup(address x, address y, uint8 gameTypeId) returns (Match) {
        var gameType = GameType(gameTypeId);
        if (gameType == GameType.NaughtCross) {
            return new NaughtCross(x, y, watcher);
        }
        throw;
    }

    function callback(Watcher _watcher) {
        if (address(watcher) != 0x0) throw;
        watcher = _watcher;
    }
}
