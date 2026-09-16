# Design notes

The redesign centers the invitation to play. Overview communicates the game, gives a clear practice action, and exposes rules before asking for any wallet permission. Wallet access is a secondary header action.

The palette uses forest navigation and hero surfaces, warm light workspace surfaces, and lime accents for primary entry. The central star and geometric tabletop illustration are code-native assets. No external font request, image-generation dependency, or stock image is required.

| Before | After | Why |
| --- | --- | --- |
| Wallet-gated first screen | Guest overview and optional wallet dialog | Players can understand and try the product immediately |
| Fixed transformed board clipped by the viewport | Upright selectable grid in a contained scrolling region | Properties and actions remain readable and reachable |
| Blurred headings and dark-on-dark tiles | Solid text and contrasting surfaces | Preserve clarity and hierarchy |
| Arbitrary cash deductions at most landings | Explicit purchase decisions, ownership, and rent | Make actions predictable and teach the actual game rules |
| Network logs claiming mock RPC synchronization | Local practice status and real match events | State what the application actually does |

## Accessibility

Native dialog handles focus containment and Escape. Closing restores the trigger when it still exists. Configuration uses labeled radio groups; selected spaces expose `aria-pressed`; active navigation uses `aria-current`. A skip link moves to the main content. Page navigation updates the document title and main-content focus.

Reduced-motion, contrast preference, forced-colors, and print styles are provided. Automated axe checks cover overview, setup, and gameplay. Browser checks cover widths from 320 to 1920 pixels. Decorative illustrations are excluded from the accessibility tree.
