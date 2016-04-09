import './Owned.sol';
import './Broker.sol';

contract Arena is Owned {

    uint8 constant public version = 0;

    event Notification(address from, address to, address at, uint8 gameType);

    Broker public broker;

    modifier nonzero() {
        if (msg.value == 0) throw;
        _
    }

    function setBroker(address addr) by(owner) {
        broker = Broker(addr);
    }

    function challenge(address to, uint8 gameType) nonzero {
        var from = msg.sender;
        var m = broker.setup(from, to, gameType);
        m.init.value(msg.value)();
        Notification(from, to, m, gameType);
    }

}
