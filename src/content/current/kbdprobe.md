---
title: "KbdProbe"
description: "A small macOS utility that maps keyboard shortcuts, events and keycodes for debugging."
status: "beta"
link: "https://example.com"
tags: ["swift", "macos"]
---

A keylogging tool for developers who build keyboard-first things: it watches
keystrokes and shows exactly which keycodes and modifier events fire, so you
can verify your shortcuts behave on a real keyboard.

**Status:** beta — the mapping table is complete, power-usage reporting is in progress.

## What it does

- Live keycode + Unicode event readout
- Modifier-state tracking (Shift/Cmd/Option/Ctrl)
- Export the captured sequence for bug reports

## Why

Debugging a shortcut that "should work" against a keyboard that silently
doesn't is the most maddening kind of issue. KbdProbe makes the invisible
visible.