module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'image.tmdb.org',
      'lh3.googleusercontent.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};
