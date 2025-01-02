'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import { getData } from '@/actions';
import { IOption } from '@/interfaces';
import { SelectBankItem } from './SelectBanksItem';

interface SelectWithCheckboxesProps {
  label: string;
  endpoint: string;
  paramName: string;
}

export const SelectBanks = ({
  label,
  endpoint,
  paramName,
}: SelectWithCheckboxesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<IOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData<IOption[]>({ url: `${endpoint}/select` });
      if (!response.error) setData(response.data);
    };

    const initialSelected = searchParams.get(paramName)?.split(',') || [];
    setSelectedOptions(initialSelected);

    fetchData();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [endpoint, searchParams, paramName, handleClickOutside]);

  const handleOptionToggle = (idOption: string) => {
    const updatedOptions = selectedOptions.includes(idOption)
      ? selectedOptions.filter((id) => id !== idOption)
      : [...selectedOptions, idOption];

    setSelectedOptions(updatedOptions);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedOptions.length) {
      params.set(paramName, updatedOptions.join(','));
    } else {
      params.delete(paramName);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className="relative inline-block text-left w-full mb-5"
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-300 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions.length > 0
            ? `${selectedOptions.length} selected`
            : `Select ${label.toLowerCase()}`}
          <FaChevronDown className="ml-2 h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-gray-300 dark:bg-gray-800">
          <div className="py-1 max-h-60 overflow-auto" role="menu">
            {data.map((option) => (
              <SelectBankItem
                key={option._id}
                option={option}
                selectedOptions={selectedOptions}
                handleOptionToggle={handleOptionToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
