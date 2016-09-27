import './Owned.sol';
import './Scoreboard.sol';
import './Match.sol';

contract Broker is Owned {

    uint8 constant public version = 0;

    Scoreboard public scoreboard;

    function setup(address x, address y, uint8 gameTypeId) returns (Match) {
        throw;
    }

    function setScoreboard(Scoreboard _scoreboard) by(owner) {
        scoreboard = _scoreboard;
    }

}
