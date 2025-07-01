# Accessibility Design for WhoDoggy?

This document outlines the accessibility features planned and included in the WhoDoggy? project to ensure an inclusive user experience.

## Overview

Accessibility (a11y) is a core part of WhoDoggy? design, aimed at enabling users with disabilities to effectively use the app on both mobile and web platforms.

## Features

- **High Contrast UI Themes:** Ensures good visibility and readability for users with low vision.
- **Readable Large Font Options:** Supports user scaling and legible typography.
- **Screen Reader Support:** Usage of accessibility labels and roles for compatibility with TalkBack (Android), VoiceOver (iOS), and web screen readers.
- **Avoidance of Critical QR Code Dependence:** QR scanning is not the sole method for accessing key information.
- **Logical Tab Order and Focus Management:** Enables keyboard navigation on web and focus indicators.
- **Accessible Form Controls:** Proper labeling and hints for inputs and buttons.

## Implementation Details

### Mobile (React Native / Expo)

- Use `accessibilityLabel` and `accessible` props on interactive components.
- Test with screen readers: TalkBack on Android and VoiceOver on iOS.
- Ensure touch targets meet recommended sizes.
- Avoid color-only cues; use shapes or text for important information.
- Use NativeWind styles mindful of contrast ratios.

### Web (React / Tailwind CSS)

- Use semantic HTML elements and ARIA roles where needed.
- Ensure all interactive elements are keyboard accessible.
- Use tools like Lighthouse, axe-core, or WAVE to audit accessibility.
- Implement focus outlines and visible focus states.
- Provide alt text for images and meaningful labels for form elements.

## Testing & Tools

- Manual testing with screen readers on mobile and web.
- Automated testing using accessibility linters and audits.
- User feedback integration to improve accessibility continuously.

## Future Plans

- Implement voice commands and advanced screen reader support.
- Add options for different color blindness modes.
- Expand keyboard shortcut support on web.

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/)
- [axe Accessibility Testing](https://www.deque.com/axe/)

---

### Maintained by Anthony Price — WhoDoggy? Project
