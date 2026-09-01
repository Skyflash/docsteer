# frozen_string_literal: true

Gem::Specification.new do |spec|
  # Follows the Jekyll theme naming convention (cf. jekyll-theme-primer).
  # Users then write `theme: jekyll-theme-docsteer` in their _config.yml.
  spec.name          = "jekyll-theme-docsteer"
  spec.version       = "1.1.0"
  spec.authors       = ["Cristian Castellari"]
  spec.email         = ["c.castellari@gmail.com"]

  spec.summary       = "Simple, searchable docs and knowledge bases for teams."
  spec.description    = "DocSteer is a fast, responsive Jekyll theme for technical " \
                        "documentation, help centres and internal knowledge bases: live " \
                        "search, six colour skins with dark mode, image lightbox, auto " \
                        "table of contents, bundled Font Awesome and SEO out of the box."
  spec.homepage      = "https://github.com/Skyflash/docsteer"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["bug_tracker_uri"] = "#{spec.homepage}/issues"

  # Theme files only: the demo site's own content (_docs, _posts, _config.yml,
  # index.md …) must not ship. Two things this filter deliberately excludes:
  #
  #   * the demo-only images — DocSteer's own social card and README screenshot
  #     are ~250 kB that every install would download for nothing, and the
  #     sample-layout figures exist purely to demo the lightbox in the docs;
  #   * license.md, which is the demo site's *page*, not the licence. It used to
  #     slip in because the match was case-insensitive and caught "LICENSE".
  #
  # favicon.svg and logo.svg DO ship: they are the theme's default brand mark.
  demo_only = %w[
    assets/images/og-default.png
    assets/images/screenshot.png
    assets/images/sample-1.svg
    assets/images/sample-2.svg
    assets/images/sample-3.svg
  ]

  spec.files = `git ls-files -z`.split("\x0").select { |f|
    f.match(%r{^(assets|_data|_layouts|_includes|_sass)/}) ||
      %w[LICENSE README.md].include?(f)
  } - demo_only

  spec.required_ruby_version = ">= 2.7.0"

  spec.add_runtime_dependency "jekyll", ">= 3.9", "< 5.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 13.0"
end
