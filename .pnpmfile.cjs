// .pnpmfile.cjs
module.exports = {
  hooks: {
    readPackage(pkg) {
      // Example override (uncomment to use):
      // if (pkg.name === 'some-package') {
      //   pkg.dependencies['left-pad'] = '^1.3.0';
      // }
      return pkg;
    }
  }
};
