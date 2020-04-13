const NodeRSA = require("node-rsa");
// const key = new NodeRSA({ b: 1024 });

const private_key = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQD34IL9y59SZF5oxqXy3n8UdXuM0Lf52eBnx6RxtZks8MurnY7p
33G1Fu9SfhexBHibFgrm4UxauG1kd4D+Wy4vc8h8oKqVQtWhhn4FUzWz+NU5gNgT
b/ixpsw8bReNHzaFsxEEKNfjqu7K9UnTgpm0zITszKkr9FixNtios96+oQIDAQAB
AoGAQoeZ4PCkJIMX69tVcyhQx3b44ESs/HyEBJbLBlINeMhwgfFaCF+Wr1omheee
CD8A9+8koe9ahQb3JX4Fuz9R15dsmzliSRSkOLZigJHNHFM1KWy646kNfUwRCWqO
VWYGJVpAQ+LTLtAmGMXJVbAylc+E1j/K88pv3eKY04p3RzkCQQD8FwupJ6In+qKf
oZCRiMA97ZYaj2o4oZQhkepM87vsxxJPYYFW41t2KTICX2kNUPHWlgoVYRAzp9jO
GSHIVQZ7AkEA+7i84ROqQ7uCx2DaGrDZwvmeEw+iQqV3rDKk2ta2U1zNS+kN8BhP
dNL5NXuch54xGgvK7Q4EGOQvqqMWSNgykwJAAKxTFKWNckviCUkWKL1TvhaXUwTV
BMexrJFGLeRsuQojC2E4RjIfOWaMwqLclfOEYc1Ow5XZxDmLg6lfhLhtZwJBAPQk
va1gMWf4WmOeoGv603q0OIksRKh3bJbrl9FZJwW7oLLbm9Ue/xHD/knNVoiC+gTV
I0DAs2ChEUpjW53Tc1kCQQD4QDy2smb5bU2TW/I9Jfjwlnd4JZTWj/XTlRMz3USp
NEgbXzbI8oQkQBmfeHMpkk9jzo0FOKXTh82BVaFSIpfe
-----END RSA PRIVATE KEY-----`;

const public_key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD34IL9y59SZF5oxqXy3n8UdXuM
0Lf52eBnx6RxtZks8MurnY7p33G1Fu9SfhexBHibFgrm4UxauG1kd4D+Wy4vc8h8
oKqVQtWhhn4FUzWz+NU5gNgTb/ixpsw8bReNHzaFsxEEKNfjqu7K9UnTgpm0zITs
zKkr9FixNtios96+oQIDAQAB
-----END PUBLIC KEY-----`;

let key_private = new NodeRSA(private_key);
let key_public = new NodeRSA(public_key);

// let enc = key_public.encrypt("Sometext", "base64");
// console.log(enc);
// let dec = key_private.decrypt(enc, "utf8");
// console.log(dec);

export function secret(text) {
  let enc = key_public.encrypt(text, "base64");
  return enc;
}

export function unsecret(text) {
  let dec = key_private.decrypt(text, "utf8");
  return dec;
}
