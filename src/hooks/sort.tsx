import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from 'react';

interface SortData {
  id: 'name' | 'totalComissions' | 'leadCount';
  title: string;
  state: 'ASC' | 'DESC' | null;
}

interface SortContextData {
  allSortData: SortData[];
  handleChangeSortData: (title: string) => void;
  activeSortData: SortData;
}

const SortContext = createContext<SortContextData>({} as SortContextData);

export const SortProvider: React.FC = ({ children }) => {
  const [allSortData, setAllSortData] = useState<SortData[]>([
    { id: 'name', title: 'nome', state: 'DESC' },
    { id: 'totalComissions', title: 'comissão', state: null },
    { id: 'leadCount', title: 'leads', state: null },
  ]);

  const handleChangeSortData = useCallback(
    (title: string) => {
      const newSort = [...allSortData];

      const prevActive = newSort.find((s) => s.state !== null);
      const nextActive = newSort.find((s) => s.title === title);

      if (prevActive === nextActive) {
        nextActive!.state = nextActive?.state === 'ASC' ? 'DESC' : 'ASC';

        setAllSortData(newSort);
        return;
      }

      prevActive!.state = null;
      nextActive!.state = 'DESC';

      setAllSortData(newSort);
    },
    [allSortData]
  );

  const activeSortData = useMemo(
    () => allSortData.find((s) => s.state !== null)!,
    [allSortData]
  );

  return (
    <SortContext.Provider
      value={{ allSortData, handleChangeSortData, activeSortData }}
    >
      {children}
    </SortContext.Provider>
  );
};

export const useSortData = (): SortContextData => {
  const context = useContext(SortContext);

  return context;
};
