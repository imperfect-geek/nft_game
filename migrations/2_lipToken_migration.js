// eslint-disable-next-line no-undef
const LipToken = artifacts.require("LipToken");

module.exports = function (deployer) {
  deployer.deploy(LipToken, "LipTokens", "LIPS");
};
