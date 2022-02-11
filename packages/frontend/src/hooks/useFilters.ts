import { addFilterRule, Field, fieldId, getTotalFilterRules } from 'common';
import { useCallback, useMemo } from 'react';
import { useExplorer } from '../providers/ExplorerProvider';

export const useFilters = () => {
    const {
        state: { filters },
        actions: { setFilters },
    } = useExplorer();

    const allFilterRules = useMemo(
        () => getTotalFilterRules(filters),
        [filters],
    );

    const isFilteredField = useCallback(
        (field: Field): boolean =>
            !!allFilterRules.find(
                (rule) => rule.target.fieldId === fieldId(field),
            ),
        [allFilterRules],
    );

    const addFilter = useCallback(
        (field: Field, value: any) =>
            setFilters(addFilterRule({ filters, field, value })),
        [filters, setFilters],
    );

    return {
        isFilteredField,
        addFilter,
    };
};
