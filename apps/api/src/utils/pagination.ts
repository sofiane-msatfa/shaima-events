import type { PaginatedResult } from "@/domain/entity/pagination-result.js";

export function paginate<T>(query: T[], page: number, pageSize: number): PaginatedResult<T> {
    const totalCount = query.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    const data = query.slice(startIndex, endIndex);
    return {
        data,
        totalCount,
        totalPages,
    };
}
