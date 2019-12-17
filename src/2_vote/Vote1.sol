pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Vote1 {
    
    mapping (string => uint) votesReceived; 
    string [] candidateList;
    
    event VoteFor(address user, string candidate);
    
    constructor(string [] memory _candidateList) public {
        candidateList = _candidateList;
    }
    
    function voteFor(string memory _candidate) public {
        votesReceived[_candidate] += 1;
        emit VoteFor(msg.sender, _candidate );
    }
    
    function getCandidateCount() public view returns (uint) {
        return candidateList.length;
    }
    
    function getVoteFor(string memory _candidate) public view returns (uint) {
        return votesReceived[_candidate];
    }
    
    function getCandidateName(uint index) public view returns (string memory) {
        return candidateList[index];
    }
}
