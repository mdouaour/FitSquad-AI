'use client'

import { useState } from 'react'
import { Square, CheckSquare } from 'lucide-react'
import clsx from 'clsx'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import type { ProgramDay, ExerciseCompletion } from '@/types'

interface DayWorkoutProps {
  day: ProgramDay
  onComplete: (exercises: ExerciseCompletion[]) => void
}

export default function DayWorkout({ day, onComplete }: DayWorkoutProps) {
  const [checkedSets, setCheckedSets] = useState<Record<string, number[]>>({})

  function toggleSet(exerciseName: string, setIndex: number) {
    setCheckedSets((prev) => {
      const current = prev[exerciseName] || []
      const updated = current.includes(setIndex)
        ? current.filter((i) => i !== setIndex)
        : [...current, setIndex].sort((a, b) => a - b)
      return { ...prev, [exerciseName]: updated }
    })
  }

  function isExerciseComplete(exerciseName: string, sets: number) {
    return (checkedSets[exerciseName] || []).length === sets
  }

  function allComplete() {
    return day.exercises.every((ex) => isExerciseComplete(ex.name, ex.sets))
  }

  function handleComplete() {
    const completions: ExerciseCompletion[] = day.exercises.map((ex) => {
      const done = checkedSets[ex.name] || []
      return {
        exercise_name: ex.name,
        sets_done: done.length,
        reps_done: done.map(() => parseInt(ex.reps, 10)),
      }
    })
    onComplete(completions)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-2">
        <Badge variant="purple">Phase {day.phase_number}</Badge>
        {day.title && <span className="text-gray-400 text-sm">{day.title}</span>}
      </div>
      <h2 className="text-xl font-bold text-white mb-1">Day {day.day_number}</h2>
      {day.description && <p className="text-gray-400 text-sm mb-6">{day.description}</p>}

      <div className="space-y-4">
        {day.exercises.map((exercise) => {
          const setsDone = checkedSets[exercise.name] || []
          const complete = isExerciseComplete(exercise.name, exercise.sets)

          return (
            <div key={exercise.name} className="bg-[#0A0A0F] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">{exercise.name}</h3>
                <span className="text-gray-500 text-sm">{exercise.sets}×{exercise.reps}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <span>Rest: {exercise.rest_seconds}s</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: exercise.sets }, (_, i) => {
                  const checked = setsDone.includes(i)
                  return (
                    <button
                      key={i}
                      onClick={() => toggleSet(exercise.name, i)}
                      className={clsx(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200',
                        checked
                          ? 'bg-[#00D68F]/20 text-[#00D68F]'
                          : 'bg-[#1E1E2E] text-gray-400 hover:bg-[#2A2A3E]'
                      )}
                    >
                      {checked ? <CheckSquare size={16} /> : <Square size={16} />}
                      <span>Set {i + 1}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <Button
        variant="primary"
        size="md"
        className="w-full mt-6"
        disabled={!allComplete()}
        onClick={handleComplete}
      >
        Complete Workout
      </Button>
    </Card>
  )
}
