with import <nixpkgs> {};

stdenv.mkDerivation {

  name = "authlogic-core";

  buildInputs = with pkgs; [
    nodejs-16_x
    nodePackages.yarn
  ];

}

