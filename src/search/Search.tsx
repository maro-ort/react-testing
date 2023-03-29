import React, { FC, useCallback, useEffect, useState } from 'react'

const Search: FC<{ apiData: string[] }> = ({ apiData }) => {
  const [value, setValue] = useState('')
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    if (!value || !apiData) setResults([])
    else {
      setResults(apiData.filter(apiCity => apiCity.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }
  }, [apiData, value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [setValue])

  const handleClick = useCallback((value: string) => {
    setValue(value)
    setResults([])
  }, [])

  return (
    <div data-testid="search">
      <input type="text" data-testid="input" onChange={handleChange} value={value} />
      <div data-testid="results">
        {results.map((r, i) => (
          <div key={i} onClick={() => handleClick(r)}>
            {r}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
