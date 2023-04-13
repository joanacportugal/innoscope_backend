interface IdeaRecord {
  idea_id?: number;
  idea_title: string;
  idea_description: string;
  category: number;
  idea_complexity: string;
  idea_durationWeeks: number;
  idea_isAnon: boolean;
  idea_status?: string;
  idea_details: string;
}

export default IdeaRecord;
