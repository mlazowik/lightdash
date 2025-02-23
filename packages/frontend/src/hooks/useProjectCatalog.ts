import { ApiError, ProjectCatalog } from 'common';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { lightdashApi } from '../api';
import useQueryError from './useQueryError';

const getProjectCatalogQuery = async (projectUuid: string) =>
    lightdashApi<ProjectCatalog>({
        url: `/projects/${projectUuid}/catalog`,
        method: 'GET',
        body: undefined,
    });

export const useProjectCatalog = () => {
    const { projectUuid } = useParams<{ projectUuid: string }>();
    const setErrorResponse = useQueryError();
    return useQuery<ProjectCatalog, ApiError>({
        queryKey: ['projectCatalog'],
        queryFn: () => getProjectCatalogQuery(projectUuid),
        onError: (result) => setErrorResponse(result),
    });
};
