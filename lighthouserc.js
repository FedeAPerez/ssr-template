module.exports = {
  ci: {
    collect: {
      // collect options here
      startServerCommand: "npm run start",
      url: ["http://localhost:3001/"],
    },
    assert: {
      assertions: {
        // assert options here
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      // upload options here
      target: "temporary-public-storage",
    },
    server: {
      // server options here
    },
    wizard: {
      // wizard options here
    },
  },
};
