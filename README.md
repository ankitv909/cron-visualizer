# Cron Visualizer

A small React + TypeScript utility for understanding cron-style schedules and building human-readable recurrence patterns.

The project contains two focused tools:

1. **Cron Expression Visualizer** — parses a six-field expression into Seconds, Minutes, Hours, Days, Month, and Day of Week fields.
2. **Recurrence Pattern Generator** — builds daily, weekly, or monthly schedules and turns the selected options into a readable sentence.

## Features

- Six-field cron expression input
- Validation for the expected number of cron fields
- Parsed field breakdown with active values highlighted
- Daily recurrence with selectable time
- Weekly recurrence with selectable weekdays and time
- Monthly recurrence with day-of-month and time
- Human-readable schedule descriptions
- Responsive React UI styled with Tailwind CSS

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- ESLint

## Project Structure

```text
src/
  components/
    CronVisualizer.tsx      # Parses and displays six-field cron expressions
    RecurrencePattern.tsx   # Daily/weekly/monthly recurrence builder
  App.tsx
  main.tsx
```

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## How It Works

### Cron Visualizer

Enter a six-field expression such as:

```text
0 5 2 4 6 7
```

The UI maps each value to its corresponding schedule field. Inputs with a different number of fields display a validation message instead of producing a misleading interpretation.

### Recurrence Generator

Choose a recurrence type:

- **Daily** — select a time.
- **Weekly** — select one or more weekdays plus a time.
- **Monthly** — select a day of the month plus a time.

The selected values are converted into a readable description so the schedule is easy to verify before using it elsewhere.

## Notes

This project is intentionally focused on visualization and recurrence-form UX. It does not execute scheduled jobs or act as a full cron parser/runtime.
