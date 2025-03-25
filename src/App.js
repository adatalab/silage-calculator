import React, { useState, useEffect } from 'react';

const SilageCalculator = () => {
  const [diameter, setDiameter] = useState(1.2);
  const [height, setHeight] = useState(1.2);
  const [density, setDensity] = useState("144");
  const [weight, setWeight] = useState(0);
  const [volume, setVolume] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [customDiameter, setCustomDiameter] = useState("1.2");
  const [customHeight, setCustomHeight] = useState("1.2");

  // 밀도 옵션
  const densityOptions = [
    { value: "144", label: "낮은 밀도 (144kg/m³)", description: "손으로 눌렀을 때 푹 들어가서 모양이 돌아오지 않음" },
    { value: "160", label: "다소 낮은 밀도 (160kg/m³)", description: "들어가긴 하지만 모양이 다시 돌아옴" },
    { value: "176", label: "다소 높은 밀도 (176kg/m³)", description: "단단하지만 스파이크로 찔렀을 때 푹 들어감" },
    { value: "192", label: "높은 밀도 (192kg/m³)", description: "스파이크가 힘겹게 들어감" }
  ];

  // 지름 옵션
  const diameterOptions = [
    { value: 1.2, label: "1.2m" },
    { value: 1.5, label: "1.5m" }
  ];

  // 높이 옵션
  const heightOptions = [
    { value: 1.2, label: "1.2m" },
    { value: 1.5, label: "1.5m" },
    { value: 1.8, label: "1.8m" }
  ];

  // 부피 계산 함수
  const calculateVolume = (d, h) => {
    const radius = d / 2;
    return Math.PI * radius * radius * h;
  };

  // 무게 계산 함수
  const calculateWeight = (v, d) => {
    return Math.round(v * d);
  };

  // 사용자 정의 입력값 처리
  const handleCustomDiameterChange = (e) => {
    const value = e.target.value;
    setCustomDiameter(value);
    if (value && !isNaN(value) && parseFloat(value) > 0) {
      setDiameter(parseFloat(value));
    }
  };

  const handleCustomHeightChange = (e) => {
    const value = e.target.value;
    setCustomHeight(value);
    if (value && !isNaN(value) && parseFloat(value) > 0) {
      setHeight(parseFloat(value));
    }
  };

  // 값이 변경될 때마다 계산
  useEffect(() => {
    const calculatedVolume = calculateVolume(diameter, height);
    setVolume(calculatedVolume);
    setWeight(calculateWeight(calculatedVolume, parseFloat(density)));
  }, [diameter, height, density]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">곤포 사일리지 무게 추정하기</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <a href="https://newso.co.kr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          뉴소레터 구독하기
        </a>
        <a href="https://www.youtube.com/@newso.letter" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          유튜브
        </a>
        <a href="https://www.instagram.com/newso.letter/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          인스타그램
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">사일리지 크기</h2>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700">지름 (베일 지름)</label>
              <button
                onClick={() => setCustomMode(!customMode)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {customMode ? "기본 옵션 사용" : "직접 입력하기"}
              </button>
            </div>

            {customMode ? (
              <div className="mb-2">
                <div className="flex">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={customDiameter}
                    onChange={handleCustomDiameterChange}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="지름을 입력하세요 (m)"
                  />
                  <span className="ml-2 flex items-center">m</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                {diameterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDiameter(option.value)}
                    className={`px-4 py-2 rounded ${Math.abs(diameter - option.value) < 0.01
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">높이 (베일 높이)</label>
            {customMode ? (
              <div className="mb-2">
                <div className="flex">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={customHeight}
                    onChange={handleCustomHeightChange}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="높이를 입력하세요 (m)"
                  />
                  <span className="ml-2 flex items-center">m</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {heightOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setHeight(option.value)}
                    className={`px-4 py-2 rounded ${Math.abs(height - option.value) < 0.01
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">사일리지 밀도</h2>
          <div className="space-y-3">
            {densityOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => setDensity(option.value)}
                className={`p-2 sm:p-3 rounded cursor-pointer ${density === option.value
                  ? 'bg-blue-100 border border-blue-500'
                  : 'bg-white border'}`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${density === option.value
                    ? 'bg-blue-600'
                    : 'bg-gray-200'}`}>
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{option.label}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">계산 결과</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-2 bg-white rounded-lg">
              <p className="text-gray-600">부피</p>
              <p className="text-xl font-bold">{volume.toFixed(2)} m³</p>
              <p className="text-xs sm:text-sm text-gray-500">지름: {diameter.toFixed(1)}m, 높이: {height.toFixed(1)}m</p>
            </div>
            <div className="p-2 bg-white rounded-lg">
              <p className="text-gray-600">예상 무게</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-700">{weight} kg</p>
              <p className="text-xs sm:text-sm text-gray-500">밀도: {density} kg/m³</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">알아두세요</h3>
        <p className="text-sm text-gray-600">
          실제 무게는 장비 세팅(칼날 개수, 압력 등), 수분함량, 풀사료 종류 등에 따라 달라질 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default SilageCalculator;
