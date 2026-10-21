# SchoolMaker Extension Architecture

- **Mount**: Mounted directly as a module or submodule under /maker.
- **Backend Service**: Communicates with Go backend running on port 8080 or Render.
- **Output**: Generates <slug>.nexacampus.tech and <slug>.admin.nexacampus.tech.

## Studio Header (`components/maker/SchoolMakerHeader.tsx`)

The header is phone-first and mirrors the webapp copy in `school-webapp/components/maker/SchoolMakerHeader.tsx`:

- The brand block is `min-w-0` with a `truncate`d studio name, so it yields horizontal space to the actions instead of overflowing on 360 px screens.
- The right-hand action cluster is `flex-shrink-0`: the creator session chip shrinks internally (creator name capped at 90 px) and the "Creator Sign In" button collapses to its icon on phones (`hidden sm:inline` label), keeping at least a 40 px tap target.
- The "← Public Portal" and "Explore Campuses" links stay hidden below `sm`, where the phone layout cannot fit them.
