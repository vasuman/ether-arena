import './Match.sol';
import './Broker.sol';

contract Arena {

    event Notification(address from, address to, address at);

    address public owner;
    Broker public broker;

    function Arena() {
        owner = msg.sender;
    }

    modifier by(address _account) {
        if (msg.sender != _account) return;
        _
    }

    modifier cost(uint _value) {
        if (msg.value != _value) return;
        _
    }

    function setBroker(address addr) by(owner) {
        broker = Broker(addr);
    }

    function challenge(address to, ) cost(0 ether) {
        var from = msg.sender;
        var matchAddr = broker.setup();
        matchAddr.send(msg.value);
        Notification(from, to, matchAddr);
    }

    function kill() by(owner) {
        suicide(owner);
    }

}
