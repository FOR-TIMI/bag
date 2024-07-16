const GITHUB_ORG = "FOR-TIMI";

const projects = {
  container: { port: 3000 },
  orders: { port: 3001 },
  products: { port: 3002 },
  bag: { port: 3003 },
};

const apps = {
  all: [],
  microFrontend: [],
};

const consts = {
  remote: {
    template:
      process.env.REMOTE_TEMPLATE ||
      "https://{org}.github.io/{app}/remoteEntry.js",
    server: process.env.REMOTE_SERVER || "github.io",
  },
  local: {
    template: "{protocol}://{server}:{port}/remoteEntry.js",
    server: "localhost",
    port: 3000,
  },
};

const exposes = [
  // exports
  "./src/components/MiniBag",
  "./src/pages/BagPage",
  "./src/util",
  "./src/hooks/useBag",
];

const getRemoteEntry = (app) => {
  if (apps.microFrontend.includes(app)) {
    return consts.local.template
      .replace("{protocol}", "http")
      .replace("{server}", consts.local.server)
      .replace("{port}", projects[app].port);
  } else {
    return consts.remote.template
      .replace("{org}", GITHUB_ORG)
      .replace("{app}", app);
  }
};

const getRemotes = () => {
  return apps.all.reduce(
    (acc, app) => ({
      ...acc,
      [app]: `${app}@${getRemoteEntry(app)}`,
    }),
    {}
  );
};

const getPublicPath = (port) => {
  if (process.env.NODE_ENV === "production") {
    return `https://${GITHUB_ORG}.github.io/${packageJson.name}/`;
  }
  return `http://localhost:${port}/`;
};

const getPort = (name) => {
  return projects[name]?.port || 3000;
};

const getExposes = (exposes) => {
  return exposes.reduce(
    (acc, path) => ({ ...acc, [path.replace("/src", "")]: path }),
    {}
  );
};

module.exports = {
  getPort,
  getPublicPath,
  getRemotes,
  exposes: getExposes(exposes),
};
