let
  nixpkgs = import <nixpkgs> {};
in
nixpkgs.mkShell {
  buildInputs = [
    nixpkgs.nodejs-18_x
  ];
}