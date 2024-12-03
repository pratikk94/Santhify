import React, { useState } from 'react';
import { Modal, Input,  Slider, DatePicker, Button,  Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../FiltersModal/FiltersModal.css';

const { RangePicker } = DatePicker;

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([14, 37]);
  const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null]>([null, null]);
  const [dateAdded, setDateAdded] = useState<moment.Moment | null>(null);

  const handleApply = () => {
    onApply({
      countries: selectedCountries,
      ageRange,
      dateRange,
      dateAdded,
    });
  };

  const handleReset = () => {
    setSelectedCountries([]);
    setAgeRange([14, 37]);
    setDateRange([null, null]);
    setDateAdded(null);
  };

  return (
    <Modal
      title="Filter"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      className="filter-modal"
    >
      {/* Country Filter */}
      <div className="filter-section">
        <div className="filter-header">
          <span>Country</span>
          <Button type="link" onClick={() => setSelectedCountries([])}>
            Clear
          </Button>
        </div>
        <Input
          placeholder="Search Country"
          prefix={<SearchOutlined />}
          onPressEnter={(e) => {
            if (e.currentTarget.value) {
              setSelectedCountries([...selectedCountries, e.currentTarget.value]);
              e.currentTarget.value = '';
            }
          }}
        />
        <div className="selected-countries">
          {selectedCountries.map((country, index) => (
            <Tag
              key={index}
              closable
              onClose={() =>
                setSelectedCountries(selectedCountries.filter((c) => c !== country))
              }
            >
              {country}
            </Tag>
          ))}
        </div>
      </div>

      {/* Age Range Filter */}
      <div className="filter-section">
        <div className="filter-header">
          <span>Age</span>
          <Button type="link" onClick={() => setAgeRange([14, 37])}>
            Clear
          </Button>
        </div>
        <Slider
          range
          min={0}
          max={100}
          defaultValue={[14, 37]}
          value={ageRange}
          onChange={(value) => setAgeRange(value as [number, number])}
        />
      </div>

      {/* Date Range Filter */}
      <div className="filter-section">
        <div className="filter-header">
          <span>Select Date</span>
          <Button type="link" onClick={() => setDateRange([null, null])}>
            Clear
          </Button>
        </div>
        <RangePicker
          value={dateRange}
          onChange={(values) => setDateRange(values as [moment.Moment, moment.Moment])}
        />
      </div>

      {/* Date Added Filter */}
      <div className="filter-section">
        <div className="filter-header">
          <span>Date Added</span>
          <Button type="link" onClick={() => setDateAdded(null)}>
            Clear
          </Button>
        </div>
        <DatePicker value={dateAdded} onChange={(value) => setDateAdded(value)} />
      </div>

      {/* Footer Buttons */}
      <div className="filter-footer">
        <Button onClick={handleReset}>Reset</Button>
        <Button type="primary" onClick={handleApply}>
          Apply Now
        </Button>
      </div>
    </Modal>
  );
};

export default FilterModal;