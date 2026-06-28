/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sagewayai.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: { userAgent: '*', allow: '/' },
  },
  changefreq: 'daily',
  priority: 0.8,
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.8,
    lastmod: new Date().toISOString(),
  }),
};
