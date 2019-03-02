# Change Log

## Version 2.1.1 _(2019-03-02)_

- Upgraded dependencies for performance improvements and bug fixes

## Version 2.1.0 _(2019-02-02)_

- Added some hover effects
- Modified some styles

## Version 2.0.0 _(2018-12-07)_

- Added a warning rather than hiding elements when JavaScript is disabled
- Refactored the layout to constrain the header and footer widths instead of
  only the content
- Updated emotion to v10 ([#15][#15], [d0c16028][d0c16028],
  [528f3296][528f3296])
- Refactored search/filter matching logic ([64cbf530][64cbf530])
- Converted codebase to use React Hooks 🤠 ([#17][#17])

##### Breaking Changes

- Added a feedback form ([#14][#14])

  _This feature requires that the project be hosted on Netlify, as it relies on
  their [form handling][netlify-forms] technology. Previously, this project
  could be deployed to any static site hosting platform._

## Version 1.2.0 _(2018-11-22)_

- Blur search input after pressing ESC ([8983b455][8983b455])
- Disable search input when not shown ([5174038d][5174038d])
- Focus the search input upon showing ([c7287b35][c7287b35])
- Focus the search button upon hiding search input ([de8d16c3][de8d16c3])

## Version 1.1.2 _(2018-10-20)_

- Fixed a "flash of empty content" issue related to `<noscript>` ([#12][#12])

## Version 1.1.1 _(2018-10-04)_

- Updated page generation process to append trailing slashes to the page path
  ([e4261db4][e4261db4])

## Version 1.1.0 _(2018-10-03)_

- Added vertical spacing around list items in drink notes ([#10][#10])
- Restructured footer to show GitHub link on mobile ([#11][#11])

## Version 1.0.2 _(2018-09-27)_

- Fixed issue with the 404 page redirecting to append `?no-cache=1`

## Version 1.0.1 _(2018-09-17)_

- Fixed `Content-Security-Policy` HTTP header by adding `connect-src` directive
  to account for Gatsby image handling changes

## Version 1.0.0 _(2018-09-17)_

- Initial release

[#10]: https://github.com/wKovacs64/drinks/pull/10
[#11]: https://github.com/wKovacs64/drinks/pull/11
[e4261db4]:
  https://github.com/wKovacs64/drinks/commit/e4261db4998a9215b5f2e7e245b4933807c11aef
[#12]: https://github.com/wKovacs64/drinks/pull/12
[8983b455]:
  https://github.com/wKovacs64/drinks/commit/8983b455969a8bcac44997698fc044204e64f52e
[5174038d]:
  https://github.com/wKovacs64/drinks/commit/5174038dac048f7deabc30682633067816846d32
[c7287b35]:
  https://github.com/wKovacs64/drinks/commit/c7287b352f6dc7156b150d959ada5c37ce21bb74
[de8d16c3]:
  https://github.com/wKovacs64/drinks/commit/de8d16c3dd541776133cd436a99c619bede73ae3
[#14]: https://github.com/wKovacs64/drinks/pull/14
[netlify-forms]: https://www.netlify.com/docs/form-handling/
[#15]: https://github.com/wKovacs64/drinks/pull/15
[d0c16028]:
  https://github.com/wKovacs64/drinks/commit/d0c16028a9200faf2842be661ab1df0a219a7bfd
[528f3296]:
  https://github.com/wKovacs64/drinks/commit/528f329633724f1b06a61f2107a69168a8b7726a
[64cbf530]:
  https://github.com/wKovacs64/drinks/commit/64cbf530861839133199d79c8f93a05271eb05b9
[#17]: https://github.com/wKovacs64/drinks/pull/17
