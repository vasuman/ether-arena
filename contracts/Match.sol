contract Watcher {
    function result(address winner, address loser);
    function draw(address a, address b);
}

contract Match {

    uint8 constant public version = 0;

    enum GameType {NaughtCross}

    enum State {Initial, Pending, Accepted, Rejected, Playing, Finished}
    enum Result {Draw, Win, Lose}

    /**
     * Denotes the result of the match from the perspective of player `a`.
     */
    Result public result;

    State public state;
    address public a;
    address public b;
    Watcher watcher;
    uint wager;

    function Match(address _a, address _b, Watcher _watcher) {
        a = _a;
        b = _b;
        watcher = _watcher;
        state = State.Initial;
        wager = 0;
    }

    function init() {
        if (state != State.Initial) throw;
        wager = msg.value;
        state = State.Pending;
    }

    function accept() {
        if (msg.sender != b) {
            throw;
        }
    }

    function swap() private {
        var t = a;
        a = b;
        b = t;
    }

    function play(uint move);

    function fin(Result _result) internal {
        result = _result;
        if (result == Result.Win) {
            watcher.result(a, b);
        } else if (result == Result.Lose) {
            watcher.result(b, a);
        } else {
            watcher.draw(a, b);
        }
    }

}

contract NaughtCross is Match {
    function NaughtCross(address a, address b, Watcher w) Match(a, b, w) {}
    function play(uint move) {}
}
