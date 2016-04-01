import './Match.sol';
import './Broker.sol';

contract Arena is Watcher {

    uint8 constant public version = 0;

    event Notification(address from, address to, address at);

    address public owner;
    Broker public broker;

    modifier nonzero() {
        if (msg.value == 0) throw;
        _
    }

    modifier by(address _account) {
        if (msg.sender != _account) throw;
        _
    }

    function Arena() {
        owner = msg.sender;
    }

    function kill() by(owner) {
        suicide(owner);
    }

    function setBroker(address addr) by(owner) {
        broker = Broker(addr);
        broker.callback(this);
    }

    function challenge(address to, uint8 gameTypeId) nonzero {
        var from = msg.sender;
        var m = broker.setup(from, to, gameTypeId);
        m.init.value(msg.value)();
        Notification(from, to, m);
    }

    function result(address w, address l) {}
    function draw(address a, address b) {}
}
