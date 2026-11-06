# Innovative Performance Auto, Menands NY

One-page site for Innovative Performance Auto (245 Broadway, Menands, NY 12204, (518) 449-8061),
built from scratch, no frameworks. Live on GitHub Pages.

## Design identity: the spec sheet

The shop is a stone-faced mid-century building on Broadway with a 1972 El Camino SS parked out
front and a neon OPEN sign. The reviews all describe the same thing: the owner, Mike, tells you
the truth even when it costs him the job, and walks you into the bay to show you the worn part.
So the design speaks plain: a concrete-gray page, graphite ink, and street-marking yellow used
only where it means something (the open-now chip, the review sticker, today's row in the hours
table, the call bar). Display type is Bricolage Grotesque, body is Instrument Sans.

The one orchestrated motion is the "lift": the hero photograph rises into view like a car on a
hoist, the headline and copy settle, a tick ruler draws across, and the 4.9 review badge stamps
down like an inspection sticker. Everything after that is quiet. Reduced-motion users get the
full layout with no animation.

## Real data only

- Reviews are the shop's actual Google reviews, reprinted verbatim, with reviewer names and
  dates. Nothing invented. 4.9 rating across 110 reviews as of Nov 6, 2026.
- Photos are from the shop's Google listing, credited to Eric Luper and Garry Smith on Google Maps.
- Hours are the Google listing's exact hours (8:01 to 6:01, and yes, the odd minutes are what
  Google shows). The open/closed chip in the header and the mobile call bar are computed live
  in America/New_York from those hours.
- Services listed are only what is evidenced: "complete auto service and computer diagnostics"
  is the wording on the shop's own sign, and tires appear in a customer review. Anything else
  would need the shop's confirmation.

## Structure

- index.html, styles.css, script.js, favicon.svg
- images/ (three photos from the Google listing)
