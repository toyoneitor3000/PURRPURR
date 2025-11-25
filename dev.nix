{ pkgs, ... }:
{
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.python311
    pkgs.poetry
  ];
  idx = {
    extensions = [
      "svelte.svelte-vscode"
      "vue.volar"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
    environment = {
      PYTHONPATH = ''
        ${pkgs.python311.pkgs.duckduckgo-search}/lib/python3.11/site-packages
        ${pkgs.python311.pkgs.python-dotenv}/lib/python3.11/site-packages
      '';
    };
  };
}
