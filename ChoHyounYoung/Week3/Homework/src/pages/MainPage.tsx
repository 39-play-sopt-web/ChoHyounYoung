import { useState } from 'react'
import StarSelect from '../components/starselect'

const ratingFilters = [
  { id: 'all', label: '전체', min: 0, max: 10 },
  { id: '9', label: '9점 이상', min: 9, max: 10 },
  { id: '8', label: '8 ~ 9점', min: 8, max: 9 },
  { id: '7', label: '7 ~ 8점', min: 7, max: 8 },
  { id: '6', label: '6 ~ 7점', min: 6, max: 7 },
  { id: 'under6', label: '6점 미만', min: 0, max: 6 },
] as const

function MainPage() {
  const [selectedFilter, setSelectedFilter] = useState<(typeof ratingFilters)[number]>(ratingFilters[0])

  return (
    <main className="mx-auto w-full max-w-[1044px] px-5 pt-[30px] pb-10">
      <h1 className="text-2xl font-extrabold text-text-primary">영화 둘러보기</h1>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="영화 평점 필터">
        {ratingFilters.map((filter) => (
          <StarSelect
            key={filter.id}
            label={filter.label}
            isSelected={selectedFilter.id === filter.id}
            onClick={() => setSelectedFilter(filter)}
          />
        ))}
      </div>
    </main>
  )
}

export default MainPage
