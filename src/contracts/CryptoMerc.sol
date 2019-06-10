pragma solidity ^0.5.9;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract CryptoMerc {
    using SafeMath for uint256;
    //TODO: should be payable?
    address payable public owner;
    struct User {
        address payable addr;
        string name;
        string description;
        uint fame;
        bool isBlackListed;
    }
    mapping(address => User) public users;
    //TODO: emit on contract created?
    constructor() public {
        owner = msg.sender;
        //implicit registration of owner;
        users[owner] = User(owner, "owner", "God", 1000, false);
    }
    //Registration function
    function isRegistered(address _address) public view returns(bool){
        return users[_address].addr != address(0x0);
    }
    modifier onlyNotRegistered (address _address) {
        require(!isRegistered(_address), "User already registered");
        _;
    }
    modifier onlyRegistered (address _address) {
        require(isRegistered(_address), "User not registered");
        _;
    }
    event Registration(address addr);
    function register(string memory _name,string memory _description) public onlyNotRegistered(msg.sender){
        users[msg.sender] = User(msg.sender, _name, _description, 1, false);
        emit Registration(msg.sender);
    }
}