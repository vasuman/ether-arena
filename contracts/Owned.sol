contract Owned {

    address public owner;

    function Owned() {
        owner = msg.sender;
    }

    modifier by(address account) {
        if (msg.sender != account) throw;
        _
    }

    function kill() by(owner) {
        suicide(owner);
    }

}

