contract Watcher {
    function result(address winner, address loser);
}

contract Match {

    address public a;
    address public b;
    Watcher watcher;
    boolean odd;

    function Match(address x, address y, Watcher _watcher) {
        watcher = _watcher;
        if (true) {
            a = x;
            b = y;
        } else {
            a = y;
            b = x;
        }
    }

    modifier correctTurn() {
        if ((odd && msg.sender == a) || (!odd && msg.sender == b)) {
            _
        }
    }

    function end(address winner, address loser) internal {
        watcher.result(winner, loser);
        winner.send(this.balance);
    }
}

contract NaughtCross is Match {

}
