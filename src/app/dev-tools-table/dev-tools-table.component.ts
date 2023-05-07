import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";


export interface DevTool {
  name: string;
  url: string;
  description: string;
  image: string;
  keywords: string;
  field: string;
  category: string;
}

export interface DevToolCategory {
  category: string;
  tools: DevTool[];
}

export interface DevToolField {
  field: string;
  categories: DevToolCategory[];
}


@Component({
  selector: 'app-dev-tools-table',
  templateUrl: './dev-tools-table.component.html',
  styleUrls: ['./dev-tools-table.component.scss']
})
export class DevToolsTableComponent implements OnInit {

  url = '/assets/online-dev-tools.json';
  displayedColumns: string[] = ['name', 'url', 'description', 'image'];

  filterValue?: string;
  dataSource?: MatTableDataSource<DevTool>;

  fields: DevToolField[] = [];
  categories: DevToolCategory[] = [];
  tools: DevTool[] = [];

  applyFilter(event?: Event) {
    if (event) {
      this.filterValue = (event.target as HTMLInputElement).value;
    }
    this.updateFilter();
  }

  updateFilter() {
    if (this.dataSource && this.filterValue) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    } else if (this.dataSource) {
      this.dataSource.filter = '';
    }
  }


  ngOnInit(): void {
    this.getData().then((result: any) => {
      this.parseData(result);
    });
  }

  async getData() {
    return await fetch(this.url).then((result: Response) => {
      return result.json();
    }).catch((error: any) => {
      console.error(error);
    });
  }

  parseData(data: any) {
    this.fields = [];
    this.categories = [];
    this.tools = [];
    if (data?.length) {
      for (let field of data) {
        field = field as DevToolField;
        this.fields.push(field);
        if (field.categories) {
          for (let category of field.categories) {
            category = category as DevToolCategory;
            this.categories.push(category);
            if (category.tools) {
              for (let tool of category.tools) {
                tool = tool as DevTool;
                this.tools.push(tool);
              }
            }
          }
        }
      }
    }

    this.dataSource = new MatTableDataSource(this.tools);
    setTimeout(() => {
      this.updateFilter();
    })
  }

}
