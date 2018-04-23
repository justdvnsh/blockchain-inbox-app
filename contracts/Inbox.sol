pragma solidity ^0.4.17;

contract Inbox {
	string public message;

	function constructor(string initialMessage) public {
		message = intialMessage;
	}

	function setMessage(string newMessage) public {
		message = newMesssage;
	}
	
	function getMessage() public view returns (string) {
		return message;
	}
}

