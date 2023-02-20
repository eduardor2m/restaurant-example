import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';

import styles from '@/styles/components/Search.module.scss';

interface ISearchProps {
  handleSearch: (e: string) => void;
}

export const Search = ({ handleSearch }: ISearchProps) => {
  const [clear, setClear] = useState(false);
  return (
    <div className={styles.search}>
      <div className={styles.search_input}>
        <AiOutlineSearch className={styles.search_input_icon} />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => {
            handleSearch(e.target.value);
            setClear(true);

            if (e.target.value === '') {
              setClear(false);
            }
          }}
        />
        {clear && (
          <button
            onClick={() => {
              handleSearch('');
              setClear(false);
              const input = document.querySelector('input');
              if (input) {
                input.value = '';
              }
            }}
          >
            <MdOutlineClear color="red" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
