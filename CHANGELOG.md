# Change Log

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
