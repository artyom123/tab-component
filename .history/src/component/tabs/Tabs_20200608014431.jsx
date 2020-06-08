import React, {
    useState,
    useMemo,
    useCallback,
    useRef,
    useEffect
} from 'react';
import PropTypes from 'prop-types';

import TABS from '../../constant/constantTabs';
import { isEmpty, findChecked } from '../../helper/tabsHelper';

import './Tabs.css';


const propTypes = {
    value: PropTypes.number,
    text: PropTypes.array,
}

const defaultProps = {
    value: 1,
    text: [],
};

const Tabs = ({ value, text }) => {
    const refSelected = useRef(null);
    const refActive = useRef(null);
    
    const [tabs, setTabs] = useState([]);
    const [selectedElementStyle, setSelectedElementStyle] = useState({});

    useEffect(() => {
        if (value || isEmpty(text)) {
            const tabsNew = TABS.default.map((tab, index) => {
                tab.checked = value && tab.id === value;
                if (isEmpty(text)) {
                    tab.name = text[index];
                }

                return tab;
            });
            setTabs(tabsNew);
        } else {
            setTabs(TABS.default);
        }
    }, [value, text]);

    useEffect(() => {
        const activeElement = refActive.current;

        if (activeElement) {
            const {
                left = (value === 1 ? 0 : 1) * activeElement.offsetLeft,
                width = activeElement.offsetWidth,
                color = findChecked(tabs).color
            } = selectedElementStyle;

            const selectedElement = refSelected.current;
            const attribute = `width: ${width}px; background: ${color}; transform: translateX(${left}px)`;

            selectedElement.setAttribute("style", attribute);
        }
    }, [selectedElementStyle, tabs, refActive, value]);

    const handleClick = useCallback(({ target }, { color, id }) => {
        const tabsNew = tabs.map((tab) => {
            tab.checked = tab.id === id

            return tab;
        });

        setTabs([...tabsNew]);
        setSelectedElementStyle({
            left: target.offsetLeft,
            width: target.offsetWidth,
            color,
        });
    }, [tabs]);

    const tabsList = useMemo(() =>
        isEmpty(tabs) && tabs.map(
            ({ id, checked, color, name }) => 
                <button
                    key={id}
                    ref={refActive}
                    className={`tabs-button${checked ? ' active' : ''}`}
                    onClick={(event) => handleClick(event, { color, id })}
                >
                    { name }
                </button>
        )
    , [tabs, handleClick]);

    return (
        <div className="tabs-container">
            <div className="tabs-selected" ref={refSelected}></div>
            { tabsList }
        </div>
    );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
Tabs.displayName = 'Tabs';

export default Tabs;
