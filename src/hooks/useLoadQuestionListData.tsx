import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";

import { getQuestionList, IPage } from "@/api/question";

function useLoadQuestionListData(query: Partial<IPage> = {}) {
  const [searchParams] = useSearchParams();

  const { loading, data, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get("keyword") || "";
      const page = parseInt(searchParams.get("page") || "") || 1;
      const pageSize = parseInt(searchParams.get("pageSize") || "") || 20;

      return await getQuestionList({ ...query, keyword, page, pageSize });
    },
    {
      refreshDeps: [searchParams],
    },
  );

  return { loading, data, error, refresh };
}

export default useLoadQuestionListData;
