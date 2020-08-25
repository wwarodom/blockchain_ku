pragma solidity ^0.6.0;

contract Counter  {
    uint count;
    string message;
    
    function setMessage(string memory _message) public {
        message = _message;
    }
    
    function getMessage() public view returns (string memory ) {
        return message;
    }
    
    function setCount(uint _count) public {
        count = _count;
    }
    
    function getCount() public view returns (uint) {
        return count;
    }
}

